using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RedRock.Calendar.Modules.Finance.Contract;
using System;
using System.Collections.Generic;
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
        public async Task<ActionResult<IEnumerable<FinanceDTO>>> GetMonthlyFee(Guid userReference, DateTime startDate, DateTime endDate)
        {
            var result = await financeService.GetMonthlyFee(userReference, startDate, endDate);
            return (result == null) ? NotFound() : Ok(result);
        }


        [HttpGet("{id}/pdf")]
        public async Task<IActionResult> CreatePDF(Guid id, DateTime startDate, DateTime endDate)
        {
            var file = await financeService.GetFeeDocument(id, startDate, endDate);
            return File(file, "application/pdf");
        }

    }
}
