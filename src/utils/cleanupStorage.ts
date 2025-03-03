/**
 * Cleanup function to remove any obsolete data from localStorage
 * This is used when certain features (like vouchers) are removed from the app
 */
export const cleanupStorage = () => {
  try {
    // Remove any saved voucher data
    localStorage.removeItem('raveRemedyVoucher');
    
    console.log('Storage cleanup completed successfully');
  } catch (error) {
    console.error('Error during storage cleanup:', error);
  }
}; 