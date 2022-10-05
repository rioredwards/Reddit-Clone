# Simple Reddit Clone

## The Golden Rule:

🦸 🦸‍♂️ `Stop starting and start finishing.` 🏁

If you work on more than one feature at a time, you are guaranteed to multiply your bugs and your anxiety.

Work incrementally, being fully done, one small step at a time!

## Demo

Refer to the demo project and pet lover code, or check out [Reddit](https://www.reddit.com/)

## Starter Template:

Use [this template](https://github.com/alchemycodelab/web-template-supabase)

## Setup Supabase

1. [Create a new supabase project](https://github.com/alchemycodelab/student-resources/blob/main/resources/supabase/new-project.md)
1. [Update your `URL` and `KEY`](https://github.com/alchemycodelab/student-resources/blob/main/resources/supabase/client-url-api-key.md)
1. See below for schema (tables, RLS, storage buckets, etc.) requirements

## Requirements

For this deliverable, build a simple reddit clone. The application code for auth is already provided.

Your job is to build out an app that has:

1. A page for adding a new post
1. A home page that shows a list of all posts, click on a post takes the user to:
1. A post page that show the post and allows users to comment on the post

STRETCH Goals:

1. Image upload for posts
1. Add a profile table for users to create a profile, show user name and avatar on comments
1. Add other info to the comment, like rating or reaction

## Schema

### Storage bucket

If you are including the STRETCH goal of uploading an image, you'll need to [create a storage bucket with a policy for authenticated users](https://github.com/alchemycodelab/student-resources/blob/main/resources/supabase/storage-buckets.md)

### Data Model

1. `posts` table contains the information about a post
    - at a minimum needs to have a text content for the post, text cannot be null
    - has linked `user_id` (uuid) of user who created the post, default value `uid()` cannot be null
1. `comments` table contains info about a comment on the post
    - at a minimum needs to have a text content for the post
    - has linked `user_id` (uuid) of user who created the comment, default value `uid()` cannot be null
    - has linked `post_id` (int8) of the post this comment is on, cannot be null

#### RLS Policies

-   Only authenticated users can select data in any table
-   Inserts must use the authenticated calling user's uid

## Rubric

The following is required for your assignment to be graded:

-   PR open from `dev` to `main`
-   PR Passes CI (lint + tests)
-   PR preview on netlify

| Commit with Working Feature...                                   | Points |
| ---------------------------------------------------------------- | -----: |
| Planning artifact (pages, wire frames, state and events) for app |      3 |
| Add a Post Page                                                  |      2 |
| STRETCH: Upload Post Image                                       |     +3 |
| View All Posts                                                   |      2 |
| Posts linked to Post Detail Page                                 |      3 |
| Post Detail Page Shows Post info                                 |      3 |
| Add a comment on a post                                          |      3 |
| Show comments on post (load + new comments)                      |      4 |
