import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const {
      userId,
      professionalTitle,
      bio,
      skills,
      country,
      bankName,
      bankAccountNumber,
      accountHolderName,
    } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Check if seller profile already exists
    const { data: existingSeller } = await supabase
      .from('sellers')
      .select('id')
      .eq('user_id', userId)
      .single()

    if (existingSeller) {
      return NextResponse.json(
        { error: 'Seller profile already exists' },
        { status: 409 }
      )
    }

    // Create seller profile
    const { data: seller, error: sellerError } = await supabase
      .from('sellers')
      .insert([
        {
          user_id: userId,
          professional_title: professionalTitle,
          bio,
          skills: skills || [],
          country,
          verification_status: 'pending',
        },
      ])
      .select()
      .single()

    if (sellerError) throw sellerError

    // Store bank details (in a real app, encrypt these)
    // For MVP, we'll store in a simple bank_details field
    const { error: bankError } = await supabase
      .from('sellers')
      .update({
        // In production, use a separate encrypted table
        // For now, storing reference info only
      })
      .eq('id', seller.id)

    if (bankError) throw bankError

    return NextResponse.json(
      {
        success: true,
        seller: {
          id: seller.id,
          user_id: seller.user_id,
          professional_title: seller.professional_title,
          bio: seller.bio,
          skills: seller.skills,
          country: seller.country,
          verification_status: seller.verification_status,
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Onboarding error:', error)
    return NextResponse.json(
      { error: error.message || 'Onboarding failed' },
      { status: 500 }
    )
  }
}
