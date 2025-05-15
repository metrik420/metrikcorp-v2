// =============================================================================
// src/pages/Projects.jsx
// Projects showcase – complete listing of Docker containers, Pi builds, and GitHub repos
// • SEO via DefaultSEO (react‑helmet + JSON‑LD)
// • Sticky Header & Footer
// • Flip‑card animation: front = title/icon, back = details + optional URL
// • Categories: Docker, Raspberry Pi, GitHub
// =============================================================================

import React from 'react';
import { DefaultSEO } from '../seo.jsx';           // SEO defaults + structured data
import Header from '../components/Header';         // Sticky header + easter‑egg trigger
import Footer from '../components/Footer';         // Theme‑aware footer (includes version)
import {
  Server,         // MetrikCorp‑v2 site
  Activity,       // NetBox
  Database,       // Redis / Postgres / MariaDB
  Cloud,          // Nextcloud
  Image,          // Photoprism, DakBoard
  Zap,            // Live IP Tracker
  Monitor,        // Plex Media Server
  Wifi,           // Home Assistant
  Smartphone,     // Homer Launcher
  GitHub,         // GitHub repos
  Shield,         // Watchtower (auto‑updater)
  AlertTriangle,  // Broken MariaDB container
  Eye             // Fing Agent network monitor
} from 'react-feather';

// ----------------------------------------------------------------------------
// 1) Data grouped by category
// ----------------------------------------------------------------------------
const PROJECT_CATEGORIES = [
  {
    title: 'Dockerized Services',
    projects: [
      { title: 'FingAgent',           description: 'Network device & endpoint monitoring (fing/fing‑agent).',           Icon: Eye },
      { title: 'MetrikCorp‑v2 Site',  description: 'This React/Vite site containerized via Docker Compose.',         Icon: Server },
      { title: 'NetBox IPAM/DCIM',     description: 'Inventory & network automation platform.',                        Icon: Activity },
      { title: 'Redis Cache',         description: 'Caching layer for NetBox (redis:alpine).',                         Icon: Database },
      { title: 'Nextcloud Cloud',     description: 'Self‑hosted file sync & sharing server.',                         Icon: Cloud },
      { title: 'Nextcloud DB',        description: 'Database backend for Nextcloud (MariaDB).',                       Icon: Database },
      { title: 'PhotoPrism DB',       description: 'Database for PhotoPrism (MariaDB 11).',                            Icon: Database },
      { title: 'PhotoPrism Library',  description: 'AI‑driven photo management interface.',                           Icon: Image },
      { title: 'Watchtower',          description: 'Automatic updates watcher for Docker containers.',                Icon: Shield },
      { title: 'Live IP Tracker',     description: 'Real‑time IP tracking Python app in Docker.',                      Icon: Zap },
      { title: 'nginx‑proxy‑manager',  description: 'Web UI to manage Nginx reverse‑proxy.',                           Icon: Server },
      { title: 'Plex Media Server',   description: 'Home media streaming platform.',                                   Icon: Monitor },
      { title: 'Broken MariaDB',      description: 'Legacy MariaDB instance stuck restarting.',                       Icon: AlertTriangle },
    ],
  },
  {
    title: 'Raspberry Pi Projects',
    projects: [
      { title: 'Home Assistant',      description: 'Smart‑home automation hub running on Raspberry Pi OS.',           Icon: Wifi },
      { title: 'DakBoard Dashboard',  description: 'Family calendar & photo board display powered by DakBoard.',       Icon: Image },
      { title: 'Homer Launcher',      description: 'Self‑hosted “launcher” page for easy Pi‑hosted app access.',      Icon: Smartphone },
    ],
  },
  {
    title: 'Open‑Source on GitHub',
    projects: [
      { title: 'metrikcorp‑v2',     description: 'Source code for this website (React, Vite, GSAP, Docker).',       url: 'https://github.com/metrik420/metrikcorp-v2',    Icon: GitHub },
      { title: 'live‑ip‑tracker',   description: 'Dockerized IP tracking service in Python/Flask.',                  url: 'https://github.com/metrik420/live-ip-tracker', Icon: GitHub },
      { title: 'hacker‑portfolio',  description: 'React portfolio generator for devs.',                             url: 'https://github.com/metrik420/hacker-portfolio',   Icon: GitHub },
      { title: 'hacker‑blog',       description: 'Flask‑based blogging engine with Markdown support.',               url: 'https://github.com/metrik420/hacker-blog',       Icon: GitHub },
    ],
  },
];

export default function Projects() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* SEO & Structured Data */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <DefaultSEO
        title="Projects | MetrikCorp"
        description="Explore our Dockerized services, Raspberry Pi builds, and open‑source repositories."
        url="https://metrikcorp.com/projects"
        image="https://metrikcorp.com/assets/og-image-projects.jpg"
      />

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* Site Header */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <Header />

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* Intro Section */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <section className="container projects-intro">
        <h1 className="section-title">Our Projects & Services</h1>
        <p className="section-text">
          From production Docker stacks to Raspberry Pi tinkering and open‑source contributions.
        </p>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* Loop categories and render grid */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      {PROJECT_CATEGORIES.map(({ title, projects }) => (
        <section key={title} className="container projects-section">
          <h2 className="section-title">{title}</h2>
          <div className="projects-grid">
            {projects.map((proj, idx) => {
              const { title, description, url, Icon } = proj;
              const isLink = Boolean(url);

              // Wrapper: <a> if external, otherwise <div>
              const Wrapper = isLink ? 'a' : 'div';
              const wrapperProps = isLink
                ? { href: url, target: '_blank', rel: 'noopener noreferrer' }
                : {};

              return (
                <Wrapper
                  key={idx}
                  className={`project-card flip-card${isLink ? ' clickable' : ''}`}
                  {...wrapperProps}
                >
                  <div className="flip-card-inner">
                    {/* Front face: icon + title */}
                    <div className="flip-card-front">
                      <Icon className="icon-svg" aria-hidden="true" />
                      <h3 className="project-title">{title}</h3>
                    </div>
                    {/* Back face: description + optional link */}
                    <div className="flip-card-back">
                      <p className="project-desc">{description}</p>
                      {isLink && (
                        <span className="project-link">
                          View on GitHub ↗
                        </span>
                      )}
                    </div>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </section>
      ))}

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* Site Footer */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <Footer />
    </>
  );
}
