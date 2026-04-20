import React from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Projects } from '../components/Projects';
import { Achievements } from '../components/Achievements';
import { Skills } from '../components/Skills';
import { Services } from '../components/Services';
import { Contact } from '../components/Contact';
export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Achievements />
      <Skills />
      <Services />
      <Contact />
    </>);

}