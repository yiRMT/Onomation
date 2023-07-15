import { Button, Container, Textarea, Spinner } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const Page = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    // データの送信処理などを実行する場合はここに記述します
    // データ送信後にリセットしたい場合は reset() を呼び出します
    reset();
  };

  return (
    <Container as="form" p="10" boxShadow="md" borderRadius="md" onSubmit={handleSubmit(onSubmit)}>
      <label>
        ユーザー名
        <input type="text" {...register('name', { required: true, minLength: 3 })} />
        {errors.name && <div>{errors.name.message}</div>}
      </label>
      <label>
        メールアドレス
        <input type="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
        {errors.email && <div>{errors.email.message}</div>}
      </label>
      <label>
        パスワード
        <input
          type="password"
          {...register('password', { required: true, minLength: 8 })}
        />
        {errors.password && <div>{errors.password.message}</div>}
      </label>
      <label>
        自己紹介
        <Textarea {...register('description')} />
        {errors.description && <div>{errors.description.message}</div>}
      </label>
      <Button type="submit" isLoading={isSubmitting} loadingText="送信中..." spinner={<Spinner />} >
        送信
      </Button>
    </Container>
  );
};

export default Page;
