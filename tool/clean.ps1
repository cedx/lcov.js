#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
Set-Location (Split-Path $PSScriptRoot)

foreach ($item in "build", "docs", "lib") {
	if (Test-Path $item) { Remove-Item $item -Recurse }
}

foreach ($item in Get-ChildItem var -Exclude .gitkeep) {
	Remove-Item $item -Recurse
}
