const fs = require('fs');
const path = require('path');

const files = [
  'actions/account.js',
  'actions/budget.js',
  'actions/dashboard.js',
  'actions/transaction.js'
];

files.forEach(file => {
  let content = fs.readFileSync(path.join(__dirname, file), 'utf8');

  // Replace auth import
  content = content.replace(/import \{ auth \} from "@clerk\/nextjs\/server";/g, 'import { auth } from "@/auth";');

  // Replace auth() call
  content = content.replace(/const \{ userId \} = await auth\(\);/g, 'const session = await auth();\n  const userId = session?.user?.id;');

  // Remove clerkUserId lookups
  content = content.replace(/const user = await db\.user\.findUnique\(\{\s*where: \{ clerkUserId: userId \},\s*\}\);\s*if \(!user\) \{?\s*throw new Error\("User not found"\);\s*\}?/g, '');
  content = content.replace(/const user = await db\.user\.findUnique\(\{\s*where: \{ clerkUserId: userId \},\s*\}\);\s*if \(!user\) throw new Error\("User not found"\);/g, '');

  // Replace user.id with userId
  content = content.replace(/user\.id/g, 'userId');

  fs.writeFileSync(path.join(__dirname, file), content, 'utf8');
});
console.log('Refactoring complete.');
