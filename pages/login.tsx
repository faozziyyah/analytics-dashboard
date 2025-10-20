import { useState } from 'react';
import { useRouter } from 'next/router';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { z } from 'zod';
import { useAuthStore } from '../stores/authStore';
import logo from '../assets/logo.png'
import Image from 'next/image';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
});

export default function Login() {

  const router = useRouter();
  const setToken = useAuthStore((s) => s.setToken);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();
    setError(null);

    const parsed = schema.safeParse(form);

    if (!parsed.success) {
      setError(parsed.error.errors.map((x) => x.message).join(', '));
      return;
    }

    setLoading(true);

    try {

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({ message: 'Login failed' }));
        throw new Error(j.message || 'Login failed');
      }

      const data = await res.json();
      setToken(data.token);
      await router.push('/dashboard');

    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center">

        <Image src={logo} alt='' />

        <h1 className="text-2xl font-bold mb-6 text-center mt-4">Login to your account</h1>

        <form onSubmit={handleSubmit} className="space-y-8 w-[90%] m-auto">
          <Input
            label="Email Address/Username"
            type="email"
            value={form.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            onBlur={() => schema.shape.email.safeParse(form.email)}
            required
            className=''
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
            required
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          
        </form>

        <div className="mt-6 text-xs text-gray-500 text-center">
          Test with <strong>admin@example.com / Password1!</strong>
        </div>
      </div>
    </div>
  );
}
