import {createClient} from "@supabase/supabase-js"


const supabaseURL = 'https://prrkixnsasoadjwkczou.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBycmtpeG5zYXNvYWRqd2tjem91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkxOTE0MTQsImV4cCI6MjAwNDc2NzQxNH0.qNgXxhtx5glYYwaa1Q7jbQn-T4Pvxh_IP-EAzZcfsYk'

export const supabase = createClient(supabaseURL, supabaseKey)