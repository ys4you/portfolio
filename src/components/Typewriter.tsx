import { useState, useEffect } from "react";

const ROLES = [
  "Game Developer",
  "Web Developer",
  "C++ Programmer",
  "Graphics Engineer",
  "Full-Stack Builder",
];

const TYPE_SPEED = 80;
const DELETE_SPEED = 40;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 400;

export default function Typewriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex % ROLES.length]!;

    if (!deleting && displayed === currentRole) {
      // Pause, then start deleting
      const timeout = setTimeout(() => setDeleting(true), PAUSE_AFTER_TYPE);
      return () => clearTimeout(timeout);
    }

    if (deleting && displayed === "") {
      // Move to next role
      const timeout = setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        setDeleting(false);
      }, PAUSE_AFTER_DELETE);
      return () => clearTimeout(timeout);
    }

    const speed = deleting ? DELETE_SPEED : TYPE_SPEED;
    const timeout = setTimeout(() => {
      setDisplayed((prev) =>
        deleting
          ? prev.slice(0, -1)
          : currentRole.slice(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <span className="inline-flex items-baseline gap-0">
      <span className="text-accent">{displayed}</span>
      <span className="ml-0.5 inline-block h-[1.1em] w-[2px] animate-pulse bg-accent" />
    </span>
  );
}
