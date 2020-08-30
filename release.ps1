# Tag version from package.json

git checkout .
git switch master

$ciStatus = $(hub ci-status)
if ($ciStatus -ne 'success') {
    Write-Error '`hub ci-status` is not success';
    exit 1;
}
$package = Get-Content .\package.json | ConvertFrom-Json;
$version = "v$($package.version)";

git tag $version
git switch -c $version
git push origin tags/$version

git switch master
