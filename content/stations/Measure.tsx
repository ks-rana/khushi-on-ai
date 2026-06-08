import Prose from "@/components/Prose";
import Cite from "@/components/Cite";
import References, { type Ref } from "@/components/References";

const refs: Ref[] = [
  {
    n: 1,
    text: "Reuel, A., Hardy, A. F., et al. (2024). BetterBench: Assessing AI Benchmarks, Uncovering Issues, and Establishing Best Practices. NeurIPS 2024. arXiv:2411.12990.",
    href: "https://arxiv.org/abs/2411.12990",
  },
];

export default function Measure() {
  return (
    <Prose>
      <p className="lead">
        There&rsquo;s an uncomfortable question sitting under all of this: if we
        can&rsquo;t agree how to measure intelligence, can we trust the scores at
        all?
      </p>

      <p>
        Reuel and colleagues audited a pile of AI benchmarks and flagged the
        usual suspects &mdash; noise, poor reproducibility, shaky construct
        validity.
        <Cite n={1}>
          Reuel et al. (2024), &ldquo;BetterBench,&rdquo; rates benchmarks on
          dozens of criteria and finds most don&rsquo;t report statistical
          significance or allow easy replication.
        </Cite>{" "}
        Reading it as a psychology student, I kept having the same thought:{" "}
        <em>these aren&rsquo;t really technical problems.</em> Reliability,
        validity, replication &mdash; these are the things psychology has been
        fighting about for a century. The paper frames them as engineering
        issues. To me they read like old friends.
      </p>

      <p className="pull">
        These aren&rsquo;t new problems. They&rsquo;re psychology&rsquo;s oldest
        ones, wearing a lab coat.
      </p>

      <p>
        But the thing the paper mostly leaves alone is the part I couldn&rsquo;t
        stop thinking about: <strong>who runs the tests.</strong> When a company
        reports its own scores, it can quietly pick the configuration that scores
        highest, or drop the benchmark where it looks bad. A benchmark can be
        beautifully designed and still get distorted by that. The closest the
        paper comes to this is data contamination &mdash; but the conflict of
        interest is its own problem.
      </p>

      <p>
        So here&rsquo;s the study I&rsquo;d actually want to run. Take a realistic
        use case and measure it three ways: the <strong>benchmark score</strong>,
        the model&rsquo;s <strong>consistency</strong> over weeks of repeated real
        use, and whether it works <strong>equally well for people from different
        backgrounds.</strong> My bet is those three numbers wouldn&rsquo;t line up
        &mdash; and the gaps between them would tell you more about the model than
        any single score. It covers the stages the paper itself calls weakest,
        and it sidesteps contamination, because the interactions are generated
        live.
      </p>

      <p className="note-block">
        <strong>Honest note.</strong> Adapted from a discussion post I wrote for
        my AI-psychology course. The argument is mine; I used a model to help
        reshape it for the web.
      </p>

      <References items={refs} />
    </Prose>
  );
}
