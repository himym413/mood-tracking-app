import type { AuthAndOnboardingCardProps } from "../../types/auth";
import Logo from "./Logo";
import Form from "./Form";
import { useNavigate } from "react-router";

function AuthAndOnboardingCard({
  heading,
  topText,
  bottomText,
  cardType,
}: AuthAndOnboardingCardProps) {
  const navigate = useNavigate();
  const to = cardType === "login" ? "/signup" : "/login";

  return (
    <main className="linear-gradient-background min-h-screen  flex flex-col items-center gap-400 px-200 md:gap-600 py-1000">
      <Logo />
      <div className="bg-neutral-0 rounded-16 px-200 py-500 md:w-[530px] md:px-400 max-w-[530px]">
        <div className="mb-400">
          <h1 className="text-preset-3 text-neutral-900 mb-100">{heading}</h1>
          <p className="text-preset-6-regular text-neutral-600">{topText}</p>
        </div>
        <Form cardType={cardType} />
        {cardType !== "onboarding" && (
          <p className="text-neutral-600 text-center text-preset-6-regular mt-250 cursor-pointer">
            {bottomText}{" "}
            <span className="text-blue-600" onClick={() => navigate(to)}>
              {cardType === "login" ? "Sign Up" : "Log In"}
            </span>
          </p>
        )}
      </div>
    </main>
  );
}

export default AuthAndOnboardingCard;
