import Prose from "@/components/Prose";
import Cite from "@/components/Cite";
import References, { type Ref } from "@/components/References";

const refs: Ref[] = [
  {
    n: 1,
    text: "Binz, M., & Schulz, E. (2023). Using cognitive psychology to understand GPT-3. Proceedings of the National Academy of Sciences, 120(6), e2218523120.",
    href: "https://doi.org/10.1073/pnas.2218523120",
  },
];

export default function Reason() {
  return (
    <Prose>
      <p className="lead">
        One last question &mdash; maybe the one underneath all the others. When a
        model gets something right, is it <em>reasoning</em>, or just repeating
        its training?
      </p>

      <p>
        Binz and Schulz ran GPT-3 through classic cognitive-psychology
        experiments &mdash; decision-making, information search, causal reasoning
        &mdash; to reverse-engineer how it arrives at an answer, right or wrong. I
        loved the approach.
        <Cite n={1}>
          Binz &amp; Schulz (2023) borrow the toolkit of cognitive psychology to
          probe an LLM, rather than just scoring it.
        </Cite>
      </p>

      <p>
        One result stuck with me. GPT-3 got noticeably more risk-averse when the
        same gamble was reframed from &ldquo;gambling&rdquo; to
        &ldquo;investment,&rdquo; and the authors read that as the model adapting
        to a higher-stakes setting. I think there&rsquo;s a simpler explanation:
        models are trained to be cautious around money &mdash; and health, and
        other sensitive topics. That&rsquo;s not situational reasoning.
        That&rsquo;s a trained reflex.
      </p>

      <p className="pull">
        Is it adapting to the situation &mdash; or just being careful around the
        word &ldquo;investment&rdquo;?
      </p>

      <p>
        And that&rsquo;s the genuinely hard part. For any single answer, it&rsquo;s
        very difficult to tell the model&rsquo;s reasoning apart from its
        training. From the outside, the behaviour looks identical either way.
      </p>

      <p>
        Where it left me: GPT-3 felt less like a fully intelligent system and more
        like a child still developing abstract thought. It handles plenty of
        reasoning just fine, and then falls apart on the things that need real
        causal understanding or planning ahead. Which loops right back to where we
        started &mdash; <em>smart at what?</em>
      </p>

      <p className="note-block">
        <strong>Honest note.</strong> Adapted from a discussion post I wrote for
        my AI-psychology course. The reading is mine; a model helped me shape it
        for the web.
      </p>

      <References items={refs} />
    </Prose>
  );
}
