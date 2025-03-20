import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// User operations
export const userOperations = {
  // Get user profile
  getProfile: async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('clerk_user_id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update user profile
  updateProfile: async (userId, updates) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('clerk_user_id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get user's tickets
  getUserTickets: async (userId) => {
    const { data, error } = await supabase
      .from('tickets')
      .select('*, events(*)')
      .eq('clerk_user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Create new ticket
  createTicket: async (ticketData) => {
    const { data, error } = await supabase
      .from('tickets')
      .insert([{
        ...ticketData,
        user_id: uuidv4(),
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get user's events
  getUserEvents: async (userId) => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('clerk_user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Create or get user
  createOrGetUser: async (clerkUser) => {
    // First check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_user_id', clerkUser.id)
      .single();

    if (existingUser) {
      return existingUser;
    }

    // If user doesn't exist, create new user
    const newUserId = uuidv4();
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([{
        id: newUserId,
        clerk_user_id: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress,
        first_name: clerkUser.firstName,
        last_name: clerkUser.lastName,
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;
    return newUser;
  },

  // Create event with proper user reference
  createEvent: async (eventData, clerkUserId) => {
    // Get the Supabase user id for the Clerk user
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_user_id', clerkUserId)
      .single();

    if (!user) {
      throw new Error('User not found in database');
    }

    const { data, error } = await supabase
      .from('events')
      .insert([{
        ...eventData,
        organizer_id: user.id,
        clerk_user_id: clerkUserId,
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update event
  updateEvent: async (eventId, updates) => {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', eventId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete event
  deleteEvent: async (eventId) => {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId);
    
    if (error) throw error;
  },

  // Get event attendees
  getEventAttendees: async (eventId) => {
    const { data, error } = await supabase
      .from('tickets')
      .select('*, profiles(*)')
      .eq('event_id', eventId);
    
    if (error) throw error;
    return data;
  }
}; 