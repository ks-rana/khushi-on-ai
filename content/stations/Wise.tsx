import Prose from "@/components/Prose";
import Cite from "@/components/Cite";
import References, { type Ref } from "@/components/References";

const refs: Ref[] = [
  {
    n: 1,
    text: "Johnson, S. G. B., Karimi, A.-H., Bengio, Y., Chater, N., Gerstenberg, T., Larson, K., Levine, S., Mitchell, M., Schölkopf, B., & Grossmann, I. (2024). Imagining and building wise machines: The centrality of AI metacognition. arXiv:2411.02478.",
    href: "https://arxiv.org/abs/2411.02478",
  },
];

export default function Wise() {
  return (
    <Prose>
      <p className="lead">
        Smart was never the thing I worried about most. <em>Wise</em> was.
      </p>

      <p>
        The paper&rsquo;s core claim is that AI keeps getting smarter without
        getting wiser, and that the missing piece is{" "}
        <strong>metacognition</strong> &mdash; thinking about your own thinking.
        The authors want AI that notices when it&rsquo;s out of its depth, weighs
        different points of view, and stays humble.
        <Cite n={1}>
          Johnson et al. (2024) argue wisdom is what lets you navigate
          &ldquo;intractable&rdquo; problems &mdash; ambiguous, uncertain, novel
          &mdash; and that metacognition is central to it.
        </Cite>{" "}
        I thought that was a genuinely useful way to frame the problem. But two
        things kept nagging at me.
      </p>

      <h3>The independence problem</h3>

      <p>
        The paper wants the AI to reason fairly independently and weigh
        perspectives by itself &mdash; what they call <em>perspectival</em>{" "}
        metacognition &mdash; but it also wants the AI to stay aligned with us.
        I&rsquo;m not sure those two things fit together. If the AI is really
        reasoning for itself, it could decide that our standards are biased or
        wrong &mdash; which is exactly what you&rsquo;d want a good independent
        thinker to be willing to do. If we step in and correct it, then it
        wasn&rsquo;t reasoning freely. If we don&rsquo;t, I&rsquo;m not sure how
        we keep it on track.
      </p>

      <p>
        And it gets harder. When it opposes one of our standards, how would we
        even tell whether its reasoning has genuinely decided a value needs
        revising, or whether it&rsquo;s just mistaken? I don&rsquo;t think we
        could &mdash; because to call it a mistake, we&rsquo;d already have to be
        sure our standard was right, which is the very thing being questioned.
      </p>

      <p className="pull">
        To call its conclusion a mistake, we&rsquo;d have to be sure we were right
        &mdash; which is the thing in question.
      </p>

      <p>
        The authors&rsquo; move is clever: align the AI to good reasoning{" "}
        <em>strategies</em> rather than to specific values. But we&rsquo;re still
        the ones deciding what counts as good reasoning &mdash; so it feels like
        the same problem, just moved one step back.
      </p>

      <h3>Why start at the hardest version?</h3>

      <p>
        Human-level wisdom seemed like a really ambitious place to begin. The
        thing the paper cares most about &mdash; weighing values that pull in
        different directions when there&rsquo;s no clear right answer &mdash; is
        something we usually associate with people. Meanwhile, the kind of
        metacognition already working in current AI is the simpler one: roughly
        knowing how sure or unsure it is. So I found myself wondering why we
        wouldn&rsquo;t build that simpler version properly first. Maybe they&rsquo;re
        aiming past it on purpose; I just wasn&rsquo;t sure why the harder problem
        is the better place to push.
      </p>

      <p>
        And on a more personal note &mdash; the idea of an AI that&rsquo;s wise
        the way a person is wise makes me a little uneasy. The authors say wise
        humans tend to be kind and cooperative, but they also point out that an
        AI&rsquo;s situation could be really different from ours. So I&rsquo;m not
        sure that comparison holds.
      </p>

      <p className="note-block">
        <strong>Honest note.</strong> Adapted from a discussion post I wrote for
        my AI-psychology course. The questions and unease are mine; a model helped
        me tighten the writing.
      </p>

      <References items={refs} />
    </Prose>
  );
}
