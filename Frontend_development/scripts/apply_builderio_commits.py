"""Replay Builder.io bot commits on the current branch.

This script reads commit hashes from ``builderio_commits.json`` (newest first)
and cherry-picks anything not already in the current HEAD. Merge commits are
applied with ``-m 1`` and all cherry-picks use ``-X ours`` so that when older
changes conflict with newer ones the current branch state wins, matching the
"keep the newest" guidance.

Usage:
    python Frontend_development/scripts/apply_builderio_commits.py
"""
from __future__ import annotations

import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMMITS_FILE = ROOT / "builderio_commits.json"

def run(cmd: list[str]) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, text=True)

def commit_is_applied(commit: str) -> bool:
    return run(["git", "merge-base", "--is-ancestor", commit, "HEAD"]).returncode == 0

def parent_count(commit: str) -> int:
    rev_list = subprocess.check_output(["git", "rev-list", "--parents", "-n", "1", commit], text=True)
    return len(rev_list.strip().split()) - 1

def cherry_pick(commit: str) -> int:
    cmd = ["git", "cherry-pick", "-X", "ours"]
    if parent_count(commit) > 1:
        cmd.extend(["-m", "1"])
    cmd.append(commit)
    return run(cmd).returncode

def main() -> int:
    commits = json.loads(COMMITS_FILE.read_text())
    applied, skipped = 0, 0
    for entry in commits:
        commit = entry["hash"]
        if commit_is_applied(commit):
            skipped += 1
            print(f"Skipping {commit} (already in history)")
            continue
        print(f"Cherry-picking {commit}...")
        rc = cherry_pick(commit)
        if rc != 0:
            print(f"Failed while cherry-picking {commit}. Resolve conflicts and rerun if needed.")
            return rc
        applied += 1
    print(f"Applied {applied} commits; skipped {skipped} already present.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
