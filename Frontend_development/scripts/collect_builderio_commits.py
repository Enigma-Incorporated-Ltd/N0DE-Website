import json
import subprocess
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
OUTPUT_PATH = REPO_ROOT / "Frontend_development" / "builderio_commits.json"

def run_git(args):
    result = subprocess.check_output(["git", *args], cwd=REPO_ROOT)
    return result.decode()

def collect_commits(author="Builder.io"):
    hashes = run_git(["log", f"--author={author}", "--format=%H"]).strip().splitlines()
    commits = []
    for commit_hash in hashes:
        details = run_git([
            "show",
            "--name-only",
            "--format=%H%n%ad%n%s",
            "--date=short",
            commit_hash,
        ]).strip().splitlines()
        if not details:
            continue
        commit_id, date, subject, *files = details
        commits.append({
            "hash": commit_id,
            "date": date,
            "subject": subject,
            "files": [f for f in files if f],
        })
    return commits

def main():
    commits = collect_commits()
    OUTPUT_PATH.write_text(json.dumps(commits, indent=2))

if __name__ == "__main__":
    main()
