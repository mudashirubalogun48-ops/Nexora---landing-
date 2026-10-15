import { supabase } from './supabase'

export async function signUpUser(
  email: string,
  fullName: string,
  password: string,
  accountType: string = 'buyer'
) {
  try {
    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) throw authError

    // Create user profile
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user?.id,
          email,
          full_name: fullName,
          account_type: accountType,
          email_verified: false,
          password_hash: '', // Not used with Supabase Auth
        },
      ])
      .select()
      .single()

    if (userError) throw userError

    return { user: userData, auth: authData }
  } catch (error) {
    throw error
  }
}

export async function signInUser(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    // Get user profile
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user?.id)
      .single()

    if (userError) throw userError

    return { user: userData, session: data.session }
  } catch (error) {
    throw error
  }
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function verifyUserEmail(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .update({ email_verified: true })
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUserById(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}
