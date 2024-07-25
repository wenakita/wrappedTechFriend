import { supabase } from "./supabase-client";

export async function getData(table: any) {
  const { data, error } = await supabase.from(table).select();
  if (data) {
    return data;
  }
  if (error) {
    console.log(error);
  }
  return null;
}
