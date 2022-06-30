﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RedRock.Calendar.Modules.Finance.Contract
{
    public interface IFinanceService
    {
        public Task<IEnumerable<FinanceDTO>> GetMonthlyFee(Guid userReference, DateTime start, DateTime end);
        public Task<FileStreamResult> GetFeeDocument(Guid userId, DateTime start, DateTime end);
    }
}
