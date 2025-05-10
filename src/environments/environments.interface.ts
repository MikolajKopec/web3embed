export interface BaseEnvironment{
  apiUrl: string;
  stage: 'production' | 'development';
  supabaseUrl:string,
  supabaseAnonKey:string
}
