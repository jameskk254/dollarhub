import { localize } from '@deriv/translations';

// https://github.com/google/blockly/blob/master/generators/javascript/math.js
Blockly.Blocks.math_round = {
    /**
     * Check if a number is even, odd, prime, whole, positive, or negative
     * or if it is divisible by certain number. Returns true or false.
     * @this Blockly.Block
     */
    init() {
        this.jsonInit(this.definition());
    },
    definition() {
        return {
            message0: '%1 %2',
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'OP',
                    options: [
                        ['round', 'ROUND'],
                        ['round up', 'ROUNDUP'],
                        ['round down', 'ROUNDDOWN'],
                        ['round 2 decimal', 'ROUND2']
                    ],
                },
                {
                    type: 'input_value',
                    name: 'NUM',
                },
            ],
            output: 'Number',
            outputShape: Blockly.OUTPUT_SHAPE_ROUND,
            colour: Blockly.Colours.Base.colour,
            colourSecondary: Blockly.Colours.Base.colourSecondary,
            colourTertiary: Blockly.Colours.Base.colourTertiary,
            tooltip: localize('Rounds a given number to an integer'),
            category: Blockly.Categories.Mathematical,
        };
    },
    meta() {
        return {
            display_name: localize('Rounding operation'),
            description: localize(
                'This block rounds a given number according to the selection: round, round up, round down.'
            ),
        };
    },
    getRequiredValueInputs() {
        return {
            NUM: null,
        };
    },
};

Blockly.JavaScript.math_round = block => {
    const operation = block.getFieldValue('OP');
    const argument0 = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC) || '0';

    let code;

    if (operation === 'ROUND') {
        code = `Math.round(${argument0})`;
    } else if (operation === 'ROUNDUP') {
        code = `Math.ceil(${argument0})`;
    } else if (operation === 'ROUNDDOWN') {
        code = `Math.floor(${argument0})`;
    }else if(operation === 'ROUND2'){
        code = `Math.floor(${argument0} * 100) / 100`;
    }

    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
