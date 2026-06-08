import Prose from "@/components/Prose";
import Cite from "@/components/Cite";
import Bars from "@/components/Bars";
import References, { type Ref } from "@/components/References";

const refs: Ref[] = [
  {
    n: 1,
    text: "Da Silveira, T. B. N., & Lopes, H. S. (2023). Intelligence across humans and machines: a joint perspective. Frontiers in Psychology, 14, 1209761.",
    href: "https://doi.org/10.3389/fpsyg.2023.1209761",
  },
  {
    n: 2,
    text: "Waterhouse, L. (2006). Multiple Intelligences, the Mozart Effect, and Emotional Intelligence: A Critical Review. Educational Psychologist, 41(4), 207–225.",
    href: "https://doi.org/10.1207/s15326985ep4104_1",
  },
  {
    n: 3,
    text: "Gong, E. J., Bang, C. S., Lee, J. J., & Baik, G. H. (2025). Knowledge-Practice Performance Gap in Clinical Large Language Models: Systematic Review of 39 Benchmarks. Journal of Medical Internet Research, 27(1), e84120.",
    href: "https://doi.org/10.2196/84120",
  },
  {
    n: 4,
    text: "Center for AI Safety, Scale AI, & HLE Contributors Consortium (2026). A benchmark of expert-level academic questions to assess AI capabilities. Nature, 649, 1139–1146.",
    href: "https://doi.org/10.1038/s41586-025-09962-4",
  },
  {
    n: 5,
    text: "Sabour, S., et al. (2024). EmoBench: Evaluating the Emotional Intelligence of Large Language Models. arXiv:2402.12071.",
    href: "https://doi.org/10.48550/arxiv.2402.12071",
  },
  {
    n: 6,
    text: "Schlegel, K., Sommer, N. R., & Mortillaro, M. (2025). Large language models are proficient in solving and creating emotional intelligence tests. Communications Psychology, 3(1), 80.",
    href: "https://doi.org/10.1038/s44271-025-00258-x",
  },
  {
    n: 7,
    text: "Liu, Z., Anand, A., Zhou, P., Huang, J., & Zhao, J. (2024). InterIntent: Investigating Social Intelligence of LLMs via Intention Understanding in an Interactive Game Context. arXiv:2406.12203.",
    href: "https://doi.org/10.48550/arxiv.2406.12203",
  },
];

export default function Smart() {
  return (
    <Prose>
      <p className="lead">
        Before we argue about whether a machine is smarter than the people who
        built it, I think we owe ourselves one boring question: smart{" "}
        <em>at what?</em>
      </p>

      <p>
        &ldquo;Smart&rdquo; quietly collapses into &ldquo;intelligence,&rdquo; and
        intelligence is a word psychology still hasn&rsquo;t pinned down. One
        camp treats it as a single general ability. Another &mdash;
        Gardner&rsquo;s theory of multiple intelligences &mdash; treats it as a
        bundle of separate, domain-specific abilities. Both are deeply subjective
        to the person being assessed. Machine intelligence, by contrast, gets
        sorted into tidy, task-based, objective categories.
        <Cite n={1}>
          Da Silveira &amp; Lopes (2023) compare how the two fields define
          intelligence &mdash; subjective and human-centric vs. task-based and
          measurable.
        </Cite>
      </p>

      <p>
        I lean toward the multiple-domain view, which means my answer stops being
        yes/no and becomes <em>it depends what you&rsquo;re measuring.</em> In
        fairness, I should say that Gardner&rsquo;s theory is heavily criticized,
        and cognitive research suggests we don&rsquo;t actually run different
        &ldquo;intelligences&rdquo; on different neural wiring.
        <Cite n={2}>
          Waterhouse (2006) &mdash; a critical review arguing the evidence for
          separate intelligences is weak.
        </Cite>{" "}
        Even so, I think intelligence is better benchmarked domain by domain. One
        person is called intelligent for speaking nine languages with native
        fluency; another for solving brutal financial problems with ease. We
        don&rsquo;t hold them to the same ruler &mdash; and I don&rsquo;t think we
        should hold machines to one either.
      </p>

      <p className="pull">
        Excelling at what you know is not the same as knowing what to do.
      </p>

      <p>
        Medicine makes the gap concrete. On knowledge benchmarks, ChatGPT-4 and
        Claude-3 Opus clear 85% accuracy consistently. Move to{" "}
        <em>practice-based</em> tests &mdash; the ones with psychosocial,
        real-patient texture &mdash; and accuracy drops. In one systematic review
        the models missed 38% of clinically significant errors that human
        clinicians caught.
        <Cite n={3}>
          Gong et al. (2025), a review of 39 clinical benchmarks, naming the
          &ldquo;knowledge&ndash;practice performance gap&rdquo; directly.
        </Cite>
      </p>

      <Bars
        items={[
          {
            label: "Knowledge benchmarks (accuracy)",
            value: 85,
            max: 100,
            suffix: "%",
            tone: "accent",
          },
          {
            label: "Practice setting (clinically significant errors missed)",
            value: 38,
            max: 100,
            suffix: "%",
            tone: "machine",
          },
        ]}
        caption="The same models that ace the test miss real-world errors a clinician would catch. What you score and what you'd trust are not the same number."
      />

      <p>
        There&rsquo;s a wrinkle worth naming: a lot of the tests already floating
        around the internet don&rsquo;t really count as benchmarks, because the
        models clear them trivially. That&rsquo;s a limitation of the tests
        &mdash; but it&rsquo;s also a glimpse of the unnerving pace. These systems
        swallow an amount of academic material no average human could.
        <Cite n={4}>
          The &ldquo;Humanity&rsquo;s Last Exam&rdquo; benchmark (Nature, 2026)
          was built precisely because models had saturated the easier ones.
        </Cite>
      </p>

      <h3>Where it actually underperforms</h3>

      <p>
        The clearest soft spot is emotional intelligence. Humans outscore LLMs on
        EmoBench.
        <Cite n={5}>Sabour et al. (2024), EmoBench.</Cite> Although &mdash; and I
        want to be honest that the evidence cuts both ways &mdash; other work
        finds LLMs <em>out</em>-scoring humans on emotional-intelligence tests.
        <Cite n={6}>
          Schlegel et al. (2025) found LLMs proficient at both solving and{" "}
          <em>creating</em> EI tests.
        </Cite>{" "}
        The catch I keep returning to: those are standardized tests, not real
        life. Nothing in them tells us whether a model would hold together if
        something unexpected happened mid-conversation.
      </p>

      <p>
        Theory of mind &mdash; reading what other people intend &mdash; is
        another. Even with practice and extra context, LLMs still didn&rsquo;t
        beat humans at it.
        <Cite n={7}>
          Liu et al. (2024), InterIntent, testing intention-understanding in an
          interactive game.
        </Cite>
      </p>

      <p>
        The obvious response is that the next model will close all of these gaps.
        Maybe it will. But I want to judge the systems that actually exist and can
        be studied &mdash; not a hypothetical one built to win the argument.
      </p>

      <p className="note-block">
        <strong>Honest note.</strong> This section adapts an essay I wrote with AI
        assistance. The framing, the argument, and the sources are mine; I used a
        model to help tighten the prose.
      </p>

      <References items={refs} />
    </Prose>
  );
}
