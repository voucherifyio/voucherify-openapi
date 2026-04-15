const fs = require('fs');
const path = require('path');
const glob = require('glob');

const modelDir = path.join(__dirname, '..', 'sdks', 'dotnet', 'src', 'Voucherify', 'Model');

// Find all .cs files in the Model directory
const files = glob.sync(path.join(modelDir, '*.cs'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // Replace StringEnumConverter with SafeEnumConverter while preserving the enum declaration
    const stringEnumPattern = /\[JsonConverter\(typeof\(StringEnumConverter\)\)\](\s+)public enum (\w+)/g;
    const newContent = content.replace(stringEnumPattern, (match, whitespace, enumName) => {
        modified = true;
        return `[JsonConverter(typeof(SafeEnumConverter<${enumName}>))]${whitespace}public enum ${enumName}`;
    });
    
    if (modified) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Updated ${path.basename(file)}`);
    }
});

console.log('Done processing files');
