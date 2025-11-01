import AuthAndOnboardingCard from "../common/AuthAndOnboardingCard.tsx";

function Signup() {
  return (
    <AuthAndOnboardingCard
      heading="Create an account"
      topText="Join to track your daily mood and sleep with ease."
      bottomText="Already got an account?"
      cardType="signup"
    />
  );
}

export default Signup;
