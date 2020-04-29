# Tag version from package.json

$ciStatus = $(hub ci-status)
if ($ciStatus -ne 'success') {
    Write-Error '`hub ci-status` is not success';
    exit 1;
}
$package = Get-Content .\package.json | ConvertFrom-Json;
$version = "v$($package.version)";

git tag $version
git push origin $version
