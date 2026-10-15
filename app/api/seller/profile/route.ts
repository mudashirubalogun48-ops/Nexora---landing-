import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const { data: seller, error } = await supabase
      .from('sellers')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Seller profile not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ seller }, { status: 200 })
  } catch (error: any) {
    console.error('Get profile error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const {
      userId,
      professionalTitle,
      bio,
      skills,
      country,
    } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const { data: seller, error } = await supabase
      .from('sellers')
      .update({
        professional_title: professionalTitle,
        bio,
        skills: skills || [],
        country,
      })
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(
      { success: true, seller },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Update profile error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update profile' },
      { status: 500 }
    )
  }
}
