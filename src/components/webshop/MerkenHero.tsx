'use client';
import React from 'react';
import Link from 'next/link';
import CarFinder from './CarFinder';

export default function MerkenHero() {
  return (
    <div style={{ position: 'relative', fontFamily: 'Inter, sans-serif' }}>
      
      {/* 1. Hero Image Background */}
      <div style={{ 
        position: 'relative',
        width: '100%',
        height: '450px', // Large hero area
        /* A flat colour instead of a placehold.co "Garage Workspace" tile:
           an external image host is a dependency this page does not need. */
        background: 'linear-gradient(120deg, #0f172a 0%, #1e293b 60%, #334155 100%)',
      }}>
        {/* Keys we sell, on the right; desktop only, the text needs the width on a phone. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-keys.webp" alt="" className="merken-hero-keys" width={1120} height={920} />
        {/* Dark Gradient Overlay for text readability (matches the reference's left shadow) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)'
        }}></div>

        <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: 800, 
            color: '#fff', 
            marginBottom: '1rem',
            letterSpacing: '-1px'
          }}>
            Alle Automerken
          </h1>
          <div style={{ 
            display: 'flex', 
            gap: '0.75rem', 
            alignItems: 'flex-start',
            maxWidth: '500px'
          }}>
            <span style={{ 
              color: '#eab308', // Yellow quote mark
              fontSize: '4rem', 
              fontFamily: 'Georgia, serif', 
              lineHeight: 1,
              marginTop: '-0.5rem'
            }}>
              “
            </span>
            <div>
              <p style={{ 
                color: '#fff', 
                fontSize: '1.1rem', 
                lineHeight: 1.5, 
                marginBottom: '0.5rem',
                fontStyle: 'italic'
              }}>
                Vind de perfecte sleutel of accessoire speciaal voor jouw auto. Selecteer je merk om te beginnen en ontdek ons ruime aanbod.
              </p>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                <span style={{ color: '#eab308', fontFamily: 'Caveat, cursive', fontSize: '1.5rem', marginRight: '0.5rem' }}>Autosleutel24</span> team
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Overlapping Vehicle Banner */}
      <div style={{
        position: 'relative',
        marginTop: '-3rem', // Pulls banner up to overlap hero
        zIndex: 10
      }}>
        <div className="container">
          <div style={{
            background: '#f6f4eb', // Same as page bg, but acts as banner
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            padding: '2rem 2rem 0 2rem',
            boxShadow: '0 -10px 20px rgba(0,0,0,0.05)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Faint Car Icons Background Line */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: 0,
              width: '100%',
              height: '30px',
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'30\' viewBox=\'0 0 100 30\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M10 20 L20 10 L40 10 L50 20 Z\' fill=\'none\' stroke=\'%23d1d5db\' stroke-width=\'2\'/%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'3\' fill=\'none\' stroke=\'%23d1d5db\' stroke-width=\'2\'/%3E%3Ccircle cx=\'40\' cy=\'20\' r=\'3\' fill=\'none\' stroke=\'%23d1d5db\' stroke-width=\'2\'/%3E%3C/svg%3E")',
              backgroundRepeat: 'repeat-x',
              opacity: 0.5,
              zIndex: 1
            }}></div>

            <div style={{ position: 'relative', zIndex: 2, paddingBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              
              {/* The shop's own finder: make → model, only makes we stock. Replaces a year-first wizard over every car on the road. */}
              <div style={{ width: '100%', maxWidth: 450 }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1rem', textAlign: 'center' }}>Vind wat past op uw auto</h2>
                <CarFinder />
              </div>
            </div>

            {/*
              Sub-navigation with destinations that exist.

              These four links were `#alle-merken`, `#meest-gezocht`, `#nieuw`
              — anchors this page does not contain, so they scrolled nowhere —
              and `/installatie-gids`, which is a 404. The row also did not
              wrap, so the last item ran off a phone screen.
            */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.75rem 2.5rem',
              borderTop: '1px solid #e2e8f0',
              paddingTop: '1.5rem',
              paddingBottom: '1.5rem',
              position: 'relative',
              zIndex: 2
            }}>
              {[
                { href: '/catalogus', label: 'Alle producten', accent: true },
                { href: '/categorie/afstandsbedieningen', label: 'Autosleutels' },
                { href: '/aanbiedingen', label: 'Aanbiedingen' },
                { href: '/offerte', label: 'Prijsaanvraag' },
              ].map(({ href, label, accent }) => (
                <Link
                  key={href}
                  href={href}
                  style={{ fontSize: '0.75rem', fontWeight: 700, color: accent ? '#b93c20' : '#475569', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px' }}
                >
                  {label}
                </Link>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
