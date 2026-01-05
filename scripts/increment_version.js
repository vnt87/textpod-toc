const fs = require('fs');
const path = require('path');

const cargoPath = path.join(__dirname, '../Cargo.toml');
const packagePath = path.join(__dirname, '../frontend/package.json');

function incrementVersion(version) {
    const parts = version.split('.');
    if (parts.length !== 3) {
        throw new Error(`Invalid version format: ${version}`);
    }
    parts[2] = parseInt(parts[2], 10) + 1;
    return parts.join('.');
}

function updateCargo() {
    if (!fs.existsSync(cargoPath)) {
        console.error('Cargo.toml not found');
        return;
    }
    let content = fs.readFileSync(cargoPath, 'utf8');
    const versionMatch = content.match(/^version = "(\d+\.\d+\.\d+)"/m);
    if (versionMatch) {
        const currentVersion = versionMatch[1];
        const newVersion = incrementVersion(currentVersion);
        content = content.replace(`version = "${currentVersion}"`, `version = "${newVersion}"`);
        fs.writeFileSync(cargoPath, content);
        console.log(`Updated Cargo.toml version: ${currentVersion} -> ${newVersion}`);
        return newVersion;
    } else {
        console.error('Could not find version in Cargo.toml');
    }
}

function updatePackage(newVersion) {
    if (!fs.existsSync(packagePath)) {
        console.error('frontend/package.json not found');
        return;
    }
    const content = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const currentVersion = content.version;
    // If newVersion is provided (from Cargo), use it. Otherwise increment existing.
    // Ideally they should be synced.
    const nextVersion = newVersion || incrementVersion(currentVersion);

    content.version = nextVersion;
    fs.writeFileSync(packagePath, JSON.stringify(content, null, 2) + '\n');
    console.log(`Updated frontend/package.json version: ${currentVersion} -> ${nextVersion}`);
}

const newVersion = updateCargo();
updatePackage(newVersion);
