using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RedRock.Calendar.Modules.Finance.Contract;
using System;
using System.Threading.Tasks;

namespace RedRock.Calendar.Modules.Finance.Api
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class FinanceController : ControllerBase
    {
        private readonly IFinanceService financeService;

        public FinanceController(IFinanceService financeService)
        {
            this.financeService = financeService;
        }

        [HttpGet]
        public async Task<ActionResult<FinanceDTO>> GetMonthlyFee(Guid userReference, DateTime startDate, DateTime endDate)
        {
            var result = await financeService.GetMonthlyFee(userReference, startDate, endDate);
            return (result == null) ? NotFound() : Ok(JsonConvert.SerializeObject(result));
        }

    }
}
