using System;
using System.Threading.Tasks;

namespace RedRock.Calendar.Modules.Finance.Contract
{
    public interface IFinanceService
    {
        public Task<FinanceDTO> GetMonthlyFee(Guid userReference, DateTime start, DateTime end);
    }
}
