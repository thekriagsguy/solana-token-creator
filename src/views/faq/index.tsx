import { FC } from "react";

export const FaqView: FC = ({}) => {

  const questions = [
    {
      question: "How can I create Solana tokens without coding?",
      answer:
        "Our platform allows you to easily create Solana tokens without any coding knowledge. Simply follow the step-by-step instructions on our site, and your token will be generated and deployed to the Solana blockchain.",
      id: "faq-1",
    },
    {
      question: "Can I view the metadata of the tokens I create?",
      answer:
        "Yes, you can view the metadata of the tokens you create directly on our platform. We provide a detailed overview of each token's properties and attributes.",
      id: "faq-2",
    },
    {
      question: "How does the 1 SOL airdrop tool work?",
      answer:
        "You can receive a 1 SOL airdrop every 24 hours by clicking the 'Airdrop' tool on our website. Please note that the airdrop is available once per day, and it will be credited to your connected Solana wallet.",
      id: "faq-3",
    },
    {
      question: "Can I donate SOL to support the platform?",
      answer:
        "Yes, we appreciate your support! You can easily donate SOL to the creator by using the 'Donate' button available on our site. All contributions help maintain and improve the platform.",
      id: "faq-4",
    },
    {
      question: "Which Solana networks does the platform support?",
      answer:
        "Our platform supports multiple Solana networks, including mainnet, devnet, and testnet. You can switch between networks depending on your needs, whether you're testing or deploying on the mainnet.",
      id: "faq-5",
    },
    {
      question: "Is there a limit on the number of tokens I can create?",
      answer:
        "There is no strict limit on the number of tokens you can create. However, each token creation may incur a small fee, depending on the network you are using. So make sure your wallet has enough sol for fee.",
      id: "faq-6",
    },
];


  return(
    <section id="faq" className="py-20">
      <div className="container">
        <div className="mb-10 flex items-end justify-between">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-medium capitalize text-white">
              Any Question
            </h2>
            <p className="text-default-200 text-sm font-medium ">
              Check the Faq Section Below
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="hs-accordion-group space-y-4">
            {
              questions.map((question, index) => (
                <div key={index} className={`hs-accordion bg-default-950/40 overflow-hidden rounded-lg border border-white/10 backdrop-blur-3xl`} id={question.id}>
                  <button className="hs-accordion-toggle inline-flex items-center justify-between gap-x-3 px-6 py-4 text-left capitalize text-white transition-all" aria-controls={`faq-accordion-${index +1}`}>
                    <h5 className="flex text-base font-semibold">
                      <i className="me-3 h-5 w-5 stroke-white align-middle"></i>
                      {question.question}
                    </h5>
                    <i className="hs-accordion-active:-rotate-180 h-4 w-4 transition-all duration-500"></i>
                  </button>

                  <div id={`faq-accordion-${index + 1}`} className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby={question.id}>
                    <div className="px-6 pb-4 pt-0">
                      <p className="text-default-300 mb-2 text-sm font-medium">
                        {question.answer}
                      </p>
                      {/* <p className="text-default-300 text-sm font-medium">
                        Have you ever wanted to become blockchain developer check the pro NFT Marketplace Course
                      </p> */}
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  )
};


