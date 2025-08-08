const { compileExpression } = require('filtrex');
const Product = require('../models/Product');

// Helper to quote string values in filter parts
function quoteIfNeeded(part) {
  const match = part.match(/^(.+?)\s*([=<>!]+)\s*(.+)$/);
  if (!match) return part;
  let [, left, operator, right] = match;
  right = right.trim();
  const rightUnquoted = right.replace(/^['"]|['"]$/g, '');
  if (/^(true|false)$/i.test(rightUnquoted)) return `${left.trim()} ${operator} ${rightUnquoted.toLowerCase()}`;
  if (!isNaN(Number(rightUnquoted))) return `${left.trim()} ${operator} ${rightUnquoted}`;
  return `${left.trim()} ${operator} '${rightUnquoted.replace(/'/g, "\\'")}'`;
}



const evaluateSegment = async (req, res) => {
  try {
    const { conditions } = req.body;

    if (!conditions || typeof conditions !== 'string') {
      return res.status(400).json({ error: "Request body must contain a 'conditions' string." });
    }

    const lines = conditions.split('\n').map(line => line.trim()).filter(Boolean);

    if (lines.length === 0) {
      return res.status(400).json({ error: "No conditions provided." });
    }

    const query = {};

    lines.forEach(condition => {
      const [field, operator, rawValue] = condition.split(/(>=|<=|!=|=|>|<)/).map(s => s.trim());

      let value = rawValue;

      // Type conversion
      if (value === 'true') value = true;
      else if (value === 'false') value = false;
      else if (!isNaN(value)) value = Number(value);

      switch (operator) {
        case '=':
          query[field] = value;
          break;
        case '!=':
          query[field] = { $ne: value };
          break;
        case '>':
          query[field] = { $gt: value };
          break;
        case '<':
          query[field] = { $lt: value };
          break;
        case '>=':
          query[field] = { $gte: value };
          break;
        case '<=':
          query[field] = { $lte: value };
          break;
        default:
          throw new Error(`Unsupported operator: ${operator}`);
      }
    });

    const products = await Product.find(query);
    res.json({ matched: products });
  } catch (err) {
    console.error('Segment evaluation error:', err);
    res.status(400).json({ error: err.message });
  }
};


module.exports = { evaluateSegment };
