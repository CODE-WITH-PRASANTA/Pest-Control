import React, { useEffect, useRef, useState } from "react";
import "./TeamDetailsSecond.css";

const TeamDetailsSecond = () => {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [percentages, setPercentages] = useState([0, 0, 0]);

  const skills = [
    {
      name: "Pest Inspection",
      percentage: 90,
    },
    {
      name: "Treatment & Technology",
      percentage: 80,
    },
    {
      name: "Prevention & Safety",
      percentage: 75,
    },
  ];

  // Start animation when component enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      {
        threshold: 0.35,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [started]);

  // Animate percentage numbers
  useEffect(() => {
    if (!started) return;

    const duration = 1600;
    let animationFrame;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out animation
      const easedProgress = 1 - Math.pow(1 - progress, 4);

      setPercentages(
        skills.map((skill) =>
          Math.round(skill.percentage * easedProgress)
        )
      );

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [started]);

  return (
    <section
      className={`insectra-experience ${
        started ? "insectra-experience--active" : ""
      }`}
      ref={sectionRef}
    >
      <div className="insectra-experience__container">

        {/* LEFT CONTENT */}
        <div className="insectra-experience__left">

          <span className="insectra-experience__eyebrow">
            OUR EXPERTISE
          </span>

          <h2>Personal Experience</h2>

          <p>
            With years of hands-on experience in pest management,
            we combine modern technology, expert inspection and
            responsible treatment methods to create cleaner,
            healthier and pest-free environments.
          </p>

        </div>

        {/* RIGHT SKILL BARS */}
        <div className="insectra-experience__right">

          {skills.map((skill, index) => (
            <div
              className="insectra-experience__skill"
              key={skill.name}
              style={{ "--skill-index": index }}
            >

              <div className="insectra-experience__skill-header">
                <h3>{skill.name}</h3>

                <span className="insectra-experience__percentage">
                  {percentages[index]}%
                </span>
              </div>

              <div
                className="insectra-experience__track"
                role="progressbar"
                aria-label={skill.name}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={percentages[index]}
              >
                <div
                  className="insectra-experience__fill"
                  style={{
                    width: started ? `${skill.percentage}%` : "0%",
                  }}
                />
              </div>

            </div>
          ))}

        </div>
      </div>

    </section>
  );
};

export default TeamDetailsSecond;