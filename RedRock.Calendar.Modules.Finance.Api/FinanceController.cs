using DinkToPdf;
using DinkToPdf.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RedRock.Calendar.Modules.Finance.Contract;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace RedRock.Calendar.Modules.Finance.Api
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class FinanceController : ControllerBase
    {
        private readonly IFinanceService financeService;
        private readonly IConverter converter;

        public FinanceController(IFinanceService financeService, IConverter converter)
        {
            this.financeService = financeService;
            this.converter = converter;
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
            var pdf = await financeService.GetFeeDocument(id, startDate, endDate);
            var file = converter.Convert(pdf);
            return File(file, "application/pdf");
        }

    }
}
