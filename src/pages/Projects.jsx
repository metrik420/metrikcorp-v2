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
    ],
  },
  {
    title: 'Raspberry Pi Projects',
    projects: [
      { title: 'Home Assistant',      description: 'Smart‑home automation hub running on Raspberry Pi OS.',           Icon: Wifi },
      { title: 'DakBoard Dashboard',  description: 'Family calendar & photo board display powered by DakBoard.',       Icon: Image },
    ],
  },
  {
    title: 'Open‑Source on GitHub',
    projects: [
      { title: 'metrikcorp‑v2',     description: 'A modern, interactive React/Vite site for MetrikCorp, featuring scroll‑triggered animations, dynamic theme support, a real‑time canvas background, SVG iconography,',       url: 'https://github.com/metrik420/metrikcorp-v2',    Icon: GitHub },
      { title: 'it_game',   description: 'This project is a web-based simulation game where players experience the career path of an IT professional, progressing from T1 to T4 support roles.',                  url: 'https://github.com/metrik420/it_game', Icon: GitHub },
      { title: 'domain_info',  description: 'The Domain Info Script is a powerful Bash script designed to gather essential information about a specified domain. It performs a variety of checks, including WHOIS information, DNS records, blacklist status, website availability, and content management system (CMS) detection. This script is particularly useful for system administrators, web developers, and cybersecurity professionals who need to quickly assess domain properties.',                             url: 'https://github.com/metrik420/domain_info',   Icon: GitHub },
      { title: 'Kaye-The-Home-Organizer-Python',       description: 'Kaye The Family Organizer" is a user-friendly web application designed to simplify family management. It features task management, a meal planner, a grocery list, a calendar, and live weather updates. The app is designed with a modern interface, vibrant animations, and responsive design, making it easy for families to organize their daily activities.',               url: 'https://github.com/metrik420/Kaye-The-Home-Organizer-Python',       Icon: GitHub },	
      { title: 'WP-Plugin-Conflict-Checker',       description: 'Plugin & Theme Conflict Checker is a WordPress plugin designed to help you detect conflicts between active plugins and themes. It automatically monitors for common issues like PHP errors, admin notices, JavaScript conflicts, and slow page load times, making it easier to identify and troubleshoot potential problems that may be affecting your website’s performance.',               url: 'https://github.com/metrik420/WP-Plugin-Conflict-Checker',       Icon: GitHub },	
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
    </>
  );
}
