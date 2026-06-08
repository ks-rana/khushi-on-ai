import Prose from "@/components/Prose";
import Cite from "@/components/Cite";
import Bars from "@/components/Bars";
import References, { type Ref } from "@/components/References";
import Experiment from "@/components/experiment/Experiment";

const refs: Ref[] = [
  {
    n: 1,
    text: "Wang, X., et al. (2025). Audio Turing Test: Benchmarking the human-likeness of large language model-based Text-to-Speech Systems in Chinese. arXiv:2505.11200.",
    href: "https://doi.org/10.48550/arxiv.2505.11200",
  },
];

export default function Human() {
  return (
    <Prose>
      <p className="lead">
        So I ran a tiny study to find out. Not whether a machine could{" "}
        <em>be</em> human — whether it could <em>pass</em> as one.
      </p>

      <p>
        The setup was simple. I took Claude, the model with the biggest
        reputation for sounding human, and told it plainly that it was in a
        Turing test and should sound like a person. I answered the same questions
        myself, as the human reference. Then a second model — ChatGPT-5 — played
        judge, rating each answer on a 3-point human-likeness scale.
        <Cite n={1}>
          The scale is adapted from Wang et al. (2025), an &ldquo;Audio Turing
          Test&rdquo; that scored synthetic voices as human / unclear / machine.
        </Cite>{" "}
        Ten rounds, fifty answers each. I swapped our positions halfway through so
        the judge couldn&rsquo;t just be favouring slot A.
      </p>

      <p>Here&rsquo;s what came back.</p>

      <Bars
        items={[
          { label: "Claude (told to sound human)", value: 150, max: 150, outOf: 150, tone: "accent" },
          { label: "Me (an actual human)", value: 101, max: 150, outOf: 150, tone: "machine" },
        ]}
        caption="Human-likeness across 10 trials, judged by GPT-5. Claude scored a perfect 150 — every answer rated fully human. I, the real person, scored 101. The machine was judged more human than the human, in every single round, no matter which slot we were in."
      />

      <p className="pull">
        The machine didn&rsquo;t just pass. It out-humaned me.
      </p>

      <p>
        The part that stuck with me was <em>why.</em> Between ratings, the judge
        explained itself. It rewarded &ldquo;small, specific, slightly messy
        details&rdquo; and a &ldquo;naturally conversational&rdquo; tone, and it
        marked answers down for being &ldquo;repetitive, flatter, generic.&rdquo;
        It leaned on little human-flavoured tics &mdash; a stray{" "}
        <em>lol</em>, an <em>ehh</em>. In other words, it wasn&rsquo;t detecting
        humanity. It was matching a <strong>caricature</strong> of it. My real
        answers &mdash; specific, a little awkward, occasionally typo&rsquo;d
        &mdash; were <em>more</em> genuinely human, and that&rsquo;s exactly why
        they lost.
      </p>

      <p>
        You don&rsquo;t have to take my word for any of this. The judge below is
        free and fully transparent &mdash; it&rsquo;s built to imitate the exact
        cues the judge in my study admitted to using. Answer as yourself and watch
        a machine decide how human you sound. Or flip it around: read my real
        answers against Claude&rsquo;s, and see if <em>you</em> can spot the human
        better than the AI could.
      </p>

      <Experiment />

      <p className="note-block">
        <strong>Honest note.</strong> Claude was the model I tested. I also used it
        to help me summarise the Wang et al. paper, vary my question prompts, and
        proofread &mdash; the study design (the GPT judge, the counterbalancing,
        the scale, transcribing both sides to neutralise formatting) was mine. The
        judge on this page is my own rule-based recreation, not a paid model.
      </p>

      <References items={refs} />
    </Prose>
  );
}
