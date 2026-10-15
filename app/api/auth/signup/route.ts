import { NextRequest, NextResponse } from 'next/server'
import { signUpUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, fullName, password, accountType = 'buyer' } = await request.json()

    // Validation
    if (!email || !fullName || !password) {
      return NextResponse.json(
        { error: 'Email, full name, and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Sign up
    const result = await signUpUser(email, fullName, password, accountType)

    return NextResponse.json(
      {
        success: true,
        user: {
          id: result.user.id,
          email: result.user.email,
          full_name: result.user.full_name,
          account_type: result.user.account_type,
        },
        session: result.auth.session,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create account' },
      { status: 500 }
    )
  }
}
