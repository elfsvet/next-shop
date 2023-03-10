import Button from '@/components/Button';
import Field from '@/components/Field';
import Input from '@/components/Input';
import Page from '@/components/Page';
import { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import { useSignUp } from '@/hooks/user';

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signUp, signUpLoading, signUpError } = useSignUp();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const valid = await signUp(username, email, password);
    if (valid) {
      router.push('/');
    }
  };
  return (
    <Page title='Sign Up'>
      <form onSubmit={handleSubmit}>
        <Field label='Username'>
          <Input type='' value={username} required onChange={(event) => setUsername(event.target.value)} />
        </Field>
        <Field label='Email'>
          <Input type='email' value={email} required onChange={(event) => setEmail(event.target.value)} />
        </Field>
        <Field label='Password'>
          <Input type='password' value={password} required onChange={(event) => setPassword(event.target.value)} />
        </Field>
        {signUpError && <p className='text-red-700'>Invalid credentials</p>}
        {signUpLoading ? <p>Loading...</p> : <Button type='submit'>Sign Up</Button>}
      </form>
    </Page>
  );
};
export default SignUpPage;
