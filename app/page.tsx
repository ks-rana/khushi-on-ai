import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Station from "@/components/Station";
import Smart from "@/content/stations/Smart";
import Human from "@/content/stations/Human";
import Measure from "@/content/stations/Measure";
import Wise from "@/content/stations/Wise";
import Reason from "@/content/stations/Reason";
import { STATIONS } from "@/content/stations";
import styles from "./page.module.css";

export default function Home() {
  const s = Object.fromEntries(STATIONS.map((x) => [x.id, x]));

  return (
    <>
      <Nav />
      <div className={styles.shell}>
        <Hero />

        <main id="main">
        <Station id={s.smart.id} n={s.smart.n} question={s.smart.question} kicker="The argument">
          <Smart />
        </Station>

        <Station id={s.human.id} n={s.human.n} question={s.human.question} kicker="The experiment">
          <Human />
        </Station>

        <Station id={s.measure.id} n={s.measure.n} question={s.measure.question} kicker="On benchmarks">
          <Measure />
        </Station>

        <Station id={s.wise.id} n={s.wise.n} question={s.wise.question} kicker="On wisdom">
          <Wise />
        </Station>

        <Station id={s.reason.id} n={s.reason.n} question={s.reason.question} kicker="On reasoning">
          <Reason />
        </Station>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerLead}>
            Written by <strong>Khushi Suresh Rana</strong> &mdash; a stand-alone
            piece on AI through a psychology lens.
          </p>
          <p className={styles.footerNote}>
            Parts of this work were AI-assisted; where that&rsquo;s true, it
            says so. The arguments, the study design, and the conclusions are
            mine.
          </p>
        </div>
      </footer>
      </div>
    </>
  );
}
