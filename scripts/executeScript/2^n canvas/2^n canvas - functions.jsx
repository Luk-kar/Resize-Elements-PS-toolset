#include "../Ι_utils/functions/restrictInputKeys.jsx"

#include "../Ι_utils/functions/leftUpperCornerColorBGSet.jsx";

#include "../Ι_utils/functions/doesItHaveBackgroundLayer.jsx";

#include "../Ι_utils/functions/mathSumWidthAndHeight.jsx";

#include "../Ι_utils/functions/ErrorDiffrentUnitTypes.jsx";

#include "../Ι_utils/functions/getRidOfTooMuch0AtFront.jsx";

#include "../Ι_utils/functions/restrictValueUpTo.jsx";

#include "../Ι_utils/functions/setMinimalValueAt.jsx";

#include "../Ι_utils/functions/preFilterFilesToProcess.jsx";

function nearestPow2( n ){
    return Math.pow( 2, Math.ceil( Math.log( n ) / Math.log( 2 ) ) ); // Prefer this way than bitwise, becouse you need more readability than efficiency IMHO
}