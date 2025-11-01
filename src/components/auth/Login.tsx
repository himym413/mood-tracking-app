import AuthAndOnboardingCard from "../common/AuthAndOnboardingCard.tsx";

function Login() {
  return (
    <AuthAndOnboardingCard
      heading="Welcome back!"
      topText="Log in to continue tracking your mood and sleep."
      bottomText="Haven't got an account?"
      cardType="login"
    />
  );
}

export default Login;
