import { NextRequest, NextResponse } from 'next/server'
import { verifyUserEmail } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Verify email
    const user = await verifyUserEmail(userId)

    return NextResponse.json(
      {
        success: true,
        message: 'Email verified successfully',
        user: {
          id: user.id,
          email: user.email,
          email_verified: user.email_verified,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { error: 'Email verification failed' },
      { status: 500 }
    )
  }
}
