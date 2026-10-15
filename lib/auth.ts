import { supabase } from './supabase'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-prod'

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export function generateToken(userId: string, email: string) {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch {
    return null
  }
}

export async function createUser(
  email: string,
  fullName: string,
  passwordHash: string,
  accountType: string = 'buyer'
) {
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        email,
        full_name: fullName,
        password_hash: passwordHash,
        account_type: accountType,
        email_verified: false,
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUserByEmail(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
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
