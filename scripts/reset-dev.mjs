import { execFileSync } from "node:child_process";
import path from "node:path";

const repoRoot = path.resolve(process.cwd()).replace(/'/g, "''");
const currentPid = process.pid;
const parentPid = process.ppid;

const script = `
$repo = '${repoRoot}'
$currentPid = ${currentPid}
$parentPid = ${parentPid}

$targets = Get-CimInstance Win32_Process -Filter "name = 'node.exe'" | Where-Object {
  $_.ProcessId -ne $currentPid -and
  $_.ProcessId -ne $parentPid -and
  $_.CommandLine -and
  (
    (
      $_.CommandLine -like "*$repo*" -and (
        $_.CommandLine -like "*concurrently\\dist\\bin\\concurrently*" -or
        $_.CommandLine -like "*next\\dist\\bin\\next*" -or
        $_.CommandLine -like "*next\\dist\\server\\lib\\start-server.js*" -or
        $_.CommandLine -like "*node --watch src/server.js*"
      )
    ) -or
    $_.CommandLine -like "*run dev --workspace frontend*" -or
    $_.CommandLine -like "*run dev --workspace backend*"
  )
}

if ($targets) {
  $targets | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
}
`;

execFileSync("powershell", ["-NoProfile", "-Command", script], { stdio: "inherit" });
