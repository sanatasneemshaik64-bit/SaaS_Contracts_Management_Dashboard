import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Contract {
  id: string;
  name: string;
  parties: string;
  expiry: string;
  status: 'Active' | 'Expired' | 'Renewal Due';
  risk: 'Low' | 'Medium' | 'High';
}

export interface ContractDetail extends Contract {
  start: string;
  clauses: {
    title: string;
    summary: string;
    confidence: number;
  }[];
  insights: {
    risk: 'Low' | 'Medium' | 'High';
    message: string;
  }[];
  evidence: {
    source: string;
    snippet: string;
    relevance: number;
  }[];
}

interface ContractsContextType {
  contracts: Contract[];
  filteredContracts: Contract[];
  searchTerm: string;
  statusFilter: string;
  riskFilter: string;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: string) => void;
  setRiskFilter: (risk: string) => void;
  setCurrentPage: (page: number) => void;
  getContractDetail: (id: string) => Promise<ContractDetail | null>;
  refreshContracts: () => void;
}

const ContractsContext = createContext<ContractsContextType | undefined>(undefined);

export const useContracts = () => {
  const context = useContext(ContractsContext);
  if (context === undefined) {
    throw new Error('useContracts must be used within a ContractsProvider');
  }
  return context;
};

interface ContractsProviderProps {
  children: ReactNode;
}

export const ContractsProvider: React.FC<ContractsProviderProps> = ({ children }) => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [filteredContracts, setFilteredContracts] = useState<Contract[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [riskFilter, setRiskFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContracts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/contracts.json');
      if (!response.ok) {
        throw new Error('Failed to fetch contracts');
      }
      const data = await response.json();
      setContracts(data);
    } catch (err) {
      setError('Failed to load contracts. Please try again.');
      console.error('Error fetching contracts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getContractDetail = async (id: string): Promise<ContractDetail | null> => {
    try {
      const response = await fetch('/contract-details.json');
      if (!response.ok) {
        throw new Error('Failed to fetch contract details');
      }
      const data = await response.json();
      return data[id] || null;
    } catch (err) {
      console.error('Error fetching contract detail:', err);
      return null;
    }
  };

  const refreshContracts = () => {
    fetchContracts();
  };

  // Filter contracts based on search term and filters
  useEffect(() => {
    let filtered = contracts;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(contract =>
        contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.parties.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(contract => contract.status === statusFilter);
    }

    // Apply risk filter
    if (riskFilter) {
      filtered = filtered.filter(contract => contract.risk === riskFilter);
    }

    setFilteredContracts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [contracts, searchTerm, statusFilter, riskFilter]);

  useEffect(() => {
    fetchContracts();
  }, []);

  return (
    <ContractsContext.Provider
      value={{
        contracts,
        filteredContracts,
        searchTerm,
        statusFilter,
        riskFilter,
        currentPage,
        isLoading,
        error,
        setSearchTerm,
        setStatusFilter,
        setRiskFilter,
        setCurrentPage,
        getContractDetail,
        refreshContracts,
      }}
    >
      {children}
    </ContractsContext.Provider>
  );
};