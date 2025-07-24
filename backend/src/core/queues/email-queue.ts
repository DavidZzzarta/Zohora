import { OTP } from '@src/core/utils/auth/otp.utils.js'
import { sendEmail } from '@src/core/utils/email/email.client.js'
import { Queue, Worker, Job } from 'bullmq'
import { Logger } from '@src/api/middlewares/logger/access.logger.js'
import IORedis from 'ioredis'
import { SendOTPParams } from '@src/core/types/otp.types.js'

interface JobData {
  email: string
  username: string
  identifier: string
  type?: string
  data?: string | object
}

const jobHandler = async (job: Job<JobData>) => {
  const info = job.data
  const code = await OTP.generatePasscode({
    identifier: info.identifier,
    type: info.type,
    data: info.data
  })
  let email = await sendEmail({ to: info.email, name: info.username, code })
  if (email.success) return
  else {
    Logger.error('error sending the email')
  }
}

export class EmailQueue {
  private static queue: Queue

  static init({ connection }: { connection: IORedis }) {
    const worker = new Worker('sendOTP', jobHandler, { connection })
    worker.on('completed', job => {
      Logger.log(`job: ${job?.id} has completed!`)
    })
    worker.on('failed', (job, err) => {
      Logger.error(`job: ${job?.id} has failed!`)
    })
    this.queue = new Queue('sendOTP', {
      connection,
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true
      }
    })
  }

  static async add(data: SendOTPParams) {
    this.queue.add('sendOTP', data)
  }
}
