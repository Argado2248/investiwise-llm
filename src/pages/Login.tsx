import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/admin');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary">
            Admin Login
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Logga in för att hantera startup-utvärderingar
          </p>
        </div>

        <div className="bg-card shadow-lg rounded-lg p-6">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'rgb(26, 35, 126)',
                    brandAccent: 'rgb(0, 121, 107)',
                    inputBackground: 'white',
                    inputText: 'black',
                    inputBorder: 'lightgray',
                    inputBorderHover: 'rgb(26, 35, 126)',
                    inputBorderFocus: 'rgb(26, 35, 126)',
                  },
                  borderRadii: {
                    borderRadiusButton: '0.5rem',
                    buttonBorderRadius: '0.5rem',
                    inputBorderRadius: '0.5rem',
                  },
                },
              },
              className: {
                button: 'bg-primary hover:bg-primary/90 text-white',
                input: 'bg-background border-input',
                label: 'text-foreground',
              },
            }}
            theme="default"
            providers={[]}
          />
        </div>
      </div>
    </div>
  );
}