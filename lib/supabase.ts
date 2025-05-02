import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const url = "https://krmyksloafhbxcwpicaj.supabase.co"; 
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtybXlrc2xvYWZoYnhjd3BpY2FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5ODc5NjAsImV4cCI6MjA2MTU2Mzk2MH0.YXuwwtBaTeU04GuZhyurdX_8rs4megdqHavAMV-7lXU";

export const supabase = createClient(url, key, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
    }
});