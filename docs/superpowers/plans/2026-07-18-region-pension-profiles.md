# Region Pension Profiles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox syntax for tracking.

**Goal:** Add eleven-city selection backed by seven modern enterprise-employee pension parameter profiles.

**Architecture:** Store immutable region profiles inside the model core, add `region` to normalized parameters, and calculate the social pension from the selected profile's explicit reference base. Bind a native header select to the existing single-page update loop and keep Beijing's annual adjustment template Beijing-only.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node test runner.

## Task 1: Region model

- [ ] Add failing tests for profile keys, values, city mapping and different outputs.
- [ ] Add immutable `regionProfiles`, `cityProfiles`, `region` default and profile-aware normalization/calculation.
- [ ] Run all tests and commit.

## Task 2: City selector and policy copy

- [ ] Add failing HTML tests for eleven options, dynamic field note and scope copy.
- [ ] Replace the header badge with an accessible select; update input bounds, note, sources and Beijing adjustment availability on change/reset.
- [ ] Add a visible FAQ entry distinguishing employee and resident pensions, with matching JSON-LD.
- [ ] Run all tests and commit.

## Task 3: Verification and publication

- [ ] Run Node tests, XML validation and `git diff --check`.
- [ ] Verify desktop and 320px layouts, city switching, recalculation, reset and console logs in a browser.
- [ ] Push `main` and verify local/remote hashes match.
